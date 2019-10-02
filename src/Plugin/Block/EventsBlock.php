<?php

namespace Drupal\cwd_events\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides an Events Block containing Localist Data.
 *
 * @Block(
 *   id = "cwd_events_block",
 *   admin_label = @Translation("Events block"),
 *   category = @Translation("Events Block"),
 * )
 */
class EventsBlock extends BlockBase implements BlockPluginInterface {

  /**
   * List of supported format options.
   *
   * @var array
   */
  private $formatOptions = [
    'standard' => 'standard',
    'compact' => 'compact',
    'inline_compact' => 'inline_compact',
    'modern_compact' => 'modern_compact',
    'modern_standard' => 'modern_standard',
    'classic' => 'classic',
    'classic_compact' => 'classic_compact',
  ];

  /**
   * List of supported filter options.
   *
   * @var array
   */
  private $filterOptions = [
    'none' => 'none',
    'group' => 'group',
    'dept' => 'dept',
    'type' => 'type',
  ];

  /**
   * {@inheritdoc}
   */
  public function build() {
    $class = ($this->configuration['hidestyling'] === "true") ? '' : 'cwd-events-style' ;
    $target = $this->configuration['target'];
    return [
      '#attached' => [
        'library' => ["cwd_events/cwdeventslib"],
        'drupalSettings' => ["cwd_events" => $this->configuration]
      ],
      '#markup' => "<div id='$target' class='events-listing $class' ></div>",
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();
    $formatOptions = $this->formatOptions;
    $filterOptions = $this->filterOptions;

    $form['cwd_events_localist_config'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('Localist API Connection settings.'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    $form['cwd_events_localist_config']['calendarurl'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Calendar url'),
      '#description' => $this->t('The localist calendar url.'),
      '#default_value' => isset($config['calendarurl']) ? $config['calendarurl'] : '//events.cornell.edu/api/2.1/events',
    ];

    $form['cwd_events_localist_config']['apikey'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API key'),
      '#description' => $this->t('The localist API Key.'),
      '#default_value' => isset($config['apikey']) ? $config['apikey'] : 'KLhy2GtuSAGirYGY',
    ];

    $form['cwd_events_display_config'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('Build An Events Widget'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    $form['cwd_events_display_config']['format'] = [
      '#type' => 'select',
      '#title' => $this->t('Template'),
      '#description' => $this->t('Choices are: standard (default), compact (omit thumbnail, type and end time), archive (past events in reverse order), calendar (date on left)'),
      '#options' => $formatOptions,
      '#default_value' => isset($config['format']) ? $config['format'] : 'standard',
    ];

    $form['cwd_events_display_config']['entries'] = [
      '#type' => 'number',
      '#title' => $this->t('Number of Results'),
      '#description' => $this->t('Max number of entries to display, up to 50'),
      '#default_value' => isset($config['entries']) ? $config['entries'] : 3,
    ];

    $form['cwd_events_display_config']['daysahead'] = [
      '#type' => 'number',
      '#title' => $this->t('Days Ahead'),
      '#description' => $this->t('Up to 365. Set to negative for archive events.'),
      '#default_value' => isset($config['daysahead']) ? $config['daysahead'] : 365,
    ];

    $form['cwd_events_display_config']['depts'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Departments'),
      '#description' => $this->t('The department to include by ID. A comma seperated list of groups can be used.'),
      '#default_value' => isset($config['depts']) ? $config['depts'] : 0,
    ];

    $form['cwd_events_display_config']['group'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Groups'),
      '#description' => $this->t('Localist filter option'),
      '#default_value' => isset($config['group']) ? $config['group'] : 0,
    ];

    $form['cwd_events_display_config']['keyword'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Keyword'),
      '#description' => $this->t('Display events with a specific tag or keyword (can be used alone or in combination with "depts" and "group")'),
      '#default_value' => isset($config['keyword']) ? $config['keyword'] : FALSE,
    ];

    $form['cwd_events_display_options'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('Display Options'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    $form['cwd_events_display_options']['heading'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Heading'),
      '#default_value' => isset($config['heading']) ? $config['heading'] : '',
    ];

    // @todo add option for "Widget Type" list or row.

    $form['cwd_events_display_options']['readmore'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More Title'),
      '#description' => $this->t('Read More Title to be used with readmore url to link to the events page. Leave blank to remove from display.'),
      '#default_value' => isset($config['readmore']) ? $config['readmore'] : 'Read More',
    ];

    $form['cwd_events_display_options']['url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More URL'),
      '#description' => $this->t('The Read More URL, provides href to main events page used in read more title.'),
      '#default_value' => isset($config['url']) ? $config['url'] : '/events',
    ];

    $form['cwd_events_display_options']['filterby'] = [
      '#type' => 'select',
      '#title' => $this->t('Expose filters'),
      '#description' => $this->t('Exposes filters buttons for: group (default), dept(department), and type. If none is selected filters will not be exposed.'),
      '#options' => $filterOptions,
      '#default_value' => isset($config['filterby']) ? $config['filterby'] : 'group',
    ];

    $form['cwd_events_display_options']['truncatedescription'] = [
      '#type' => 'number',
      '#title' => $this->t('Description excerpt length'),
      '#description' => $this->t('The character length of the description. Leave blank for full description.'),
      '#default_value' => isset($config['truncatedescription']) ? $config['truncatedescription'] : 150,
    ];

    $form['cwd_events_display_options']['hidedescription'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Descriptions'),
      '#return_value' => 'true',
      '#default_value' => isset($config['hidedescription']) ? $config['hidedescription'] : 'false',
    ];

    $form['cwd_events_display_options']['hideimages'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Event Images'),
      '#return_value' => 'true',
      '#default_value' => isset($config['hideimages']) ? $config['hideimages'] : 'false',
    ];

    $form['cwd_events_display_options']['hideaddcal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Add to Calendar'),
      '#return_value' => 'true',
      '#default_value' => isset($config['hideaddcal']) ? $config['hideaddcal'] : 'false',
    ];

    $form['cwd_events_display_options']['hidepagination'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Pagination'),
      '#return_value' => 'true',
      '#default_value' => isset($config['hidepagination']) ? $config['hidepagination'] : 'false',
    ];

    $form['cwd_events_display_options']['hidestyling'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Styling'),
      '#return_value' => 'true',
      '#default_value' => isset($config['hidestyling']) ? $config['hidestyling'] : 'false',
    ];

    $form['cwd_events_display_options']['wrapperclass'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Add class to events wrapper'),
      '#description' => $this->t('example:cwd-card-grid three-card'),
      '#default_value' => isset($config['wrapperclass']) ? $config['wrapperclass'] : '',
    ];

    $form['cwd_events_display_options']['listclass'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Add class to events list'),
      '#description' => $this->t('example:cards'),
      '#default_value' => isset($config['listclass']) ? $config['listclass'] : '',
    ];

    $form['cwd_events_display_options']['itemclass'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Add class to event list item'),
      '#description' => $this->t('example:card'),
      '#default_value' => isset($config['itemclass']) ? $config['itemclass'] : '',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $values = $form_state->getValues();
    $formatOptions = $this->formatOptions;
    $uuid = \Drupal::service('uuid');
    $id = $uuid->generate();
    $this->configuration['id'] = $id;
    $this->configuration['target'] = "events-listing-$id";

    $this->configuration['calendarurl'] = $values['cwd_events_localist_config']['calendarurl'];
    $this->configuration['apikey'] = $values['cwd_events_localist_config']['apikey'];

    $this->configuration['format'] = $formatOptions[$values['cwd_events_display_config']['format']];
    $this->configuration['entries'] = $values['cwd_events_display_config']['entries'];
    $this->configuration['daysahead'] = $values['cwd_events_display_config']['daysahead'];
    $this->configuration['depts'] = $values['cwd_events_display_config']['depts'];
    $this->configuration['group'] = $values['cwd_events_display_config']['group'];
    $this->configuration['keyword'] = $values['cwd_events_display_config']['keyword'];

    $this->configuration['heading'] = $values['cwd_events_display_options']['heading'];
    $this->configuration['readmore'] = $values['cwd_events_display_options']['readmore'];
    $this->configuration['url'] = $values['cwd_events_display_options']['url'];
    $this->configuration['filterby'] = $values['cwd_events_display_options']['filterby'];
    $this->configuration['truncatedescription'] = $values['cwd_events_display_options']['truncatedescription'];
    $this->configuration['hidedescription'] = $values['cwd_events_display_options']['hidedescription'];
    $this->configuration['hideimages'] = $values['cwd_events_display_options']['hideimages'];
    $this->configuration['hideaddcal'] = $values['cwd_events_display_options']['hideaddcal'];
    $this->configuration['hidepagination'] = $values['cwd_events_display_options']['hidepagination'];
    $this->configuration['hidestyling'] = $values['cwd_events_display_options']['hidestyling'];
    $this->configuration['wrapperclass'] = $values['cwd_events_display_options']['wrapperclass'];
    $this->configuration['listclass'] = $values['cwd_events_display_options']['listclass'];
    $this->configuration['itemclass'] = $values['cwd_events_display_options']['itemclass'];
  }

}
